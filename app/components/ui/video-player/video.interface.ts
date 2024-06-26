export interface IVideoPlayer {
	videoSource: string
	slug: string
}

export interface IVideoElement extends HTMLVideoElement {
	// чтобы работала кнопка полный экран
	msRequestFullscreen?: () => void
	mozRequestFullScreen?: () => void
	webkitRequestFullscreen?: () => void
}
