import { cn } from "@/lib/utils"


function Container({
    children,
    className
    }:{
    children: React.ReactNode,
        className?: string 
    }) {
  // max-w-6xl - is the max width. 6xl is 72rms, that is the max width for our content
    return (
    <div className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8', className)}>
      {children}
    </div>
  )
}

export default Container
