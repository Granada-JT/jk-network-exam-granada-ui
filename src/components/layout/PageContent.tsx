import { PageContentProps } from "@/common/types"

export default function PageContent(props: PageContentProps) {
	const { children, className } = props

	return (
		<div className="min-h-screen w-full bg-black flex justify-center px-8">
			<main className={`max-w-360 min-h-screen flex items-center ${className ?? ''}`}>
				{children}
			</main>
		</div>
	)
}