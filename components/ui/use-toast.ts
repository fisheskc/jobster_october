"use client";

import * as React from "react"

type ToasterToast = {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = ToasterToast & {
  action: "ADD_TOAST" | "UPDATE_TOAST" | "DISMISS_TOAST" | "REMOVE_TOAST"
}

const _actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// ✅ changed from let → const (ESLint prefers const)
const listeners: Array<(state: ToasterToast[]) => void> = []

let memoryState: ToasterToast[] = []

function dispatch(action: ActionType) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function reducer(state: ToasterToast[], action: ActionType): ToasterToast[] {
  switch (action.action) {
    case "ADD_TOAST":
      return [action, ...state].slice(0, TOAST_LIMIT)

    case "UPDATE_TOAST":
      return state.map((t) =>
        t.id === action.id ? { ...t, ...action } : t
      )

    case "DISMISS_TOAST": {
      const { id } = action

      if (id) {
        setTimeout(() => {
          dispatch({ action: "REMOVE_TOAST", id })
        }, TOAST_REMOVE_DELAY)
      } else {
        state.forEach((toast) => {
          setTimeout(() => {
            dispatch({ action: "REMOVE_TOAST", id: toast.id })
          }, TOAST_REMOVE_DELAY)
        })
      }

      return state.map((t) =>
        t.id === id || id === undefined
          ? {
              ...t,
              open: false,
            }
          : t
      )
    }

    case "REMOVE_TOAST":
      if (action.id === undefined) {
        return []
      }
      return state.filter((t) => t.id !== action.id)

    default:
      return state
  }
}

function toast(props: ToasterToast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      ...props,
      id,
      action: "UPDATE_TOAST",
    })

  const dismiss = () => dispatch({ action: "DISMISS_TOAST", id })

  dispatch({
    ...props,
    id,
    open: true,
    onOpenChange: (open: boolean) => {
      if (!open) dismiss()
    },
    action: "ADD_TOAST",
  })

  return {
    id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<ToasterToast[]>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, []) // ✅ removed state dependency

  return {
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ action: "DISMISS_TOAST", id: toastId }),
    toasts: state,
  }
}

export { useToast, toast }