import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { IVideoElement } from './video.interface'

export const useVideo = () => {
	const videoRef = useRef<IVideoElement>(null)
	const timeLineRef = useRef<HTMLDivElement>(null)
	const progressTimeRef = useRef<HTMLSpanElement>(null)
	const playProgressBarRef = useRef<HTMLDivElement>(null)
	const bufferProgressBarRef = useRef<HTMLDivElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [isWaiting, setIsWaiting] = useState(false)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [currentTime, setCurrentTime] = useState(0) //текущее время
	const [videoDuration, setVideoDuration] = useState(0) //общее время
	const [progress, setProgress] = useState(0) //текущей прогресс

	//устанавливаем продолжительность видео
	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if (originalDuration) setVideoDuration(videoRef.current.duration)
	}, [videoRef.current?.duration])

	const onWaiting = useCallback(() => {
		const video = videoRef.current
		const playProgress = playProgressBarRef.current
		const bufferProgress = bufferProgressBarRef.current
		if (!video || !bufferProgress || !playProgress) return
		if (playProgress && bufferProgress && videoDuration > 0) {
			const play = video.currentTime / videoDuration
			if (!video.buffered.length) return
			const bufferedEnd = video.buffered.end(video.buffered.length - 1)
			const buffer = bufferedEnd / videoDuration
			if (isPlaying) {
				if (play < buffer) {
					setIsPlaying(true)
					setIsWaiting(false)
					return
				} else {
					setIsPlaying(false)
					setIsWaiting(true)
				}
			}
		}
	}, [isPlaying, videoDuration])

	const onPlay = useCallback(() => {
		if (isWaiting) setIsWaiting(false)
		setIsPlaying(true)
	}, [isWaiting])

	const onPause = useCallback(() => {
		setIsWaiting(false)
		setIsPlaying(false)
	}, [])

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play()
			onPlay()
		} else {
			videoRef.current?.pause()
			onPause()
		}
	}, [isPlaying, onPlay, onPause])

	const formatTime = (time: number) => {
		let seconds = Math.floor(time % 60),
			minutes = Math.floor(time / 60) % 60,
			hours = Math.floor(time / 3600)

		let str_seconds = seconds < 10 ? `0${seconds}` : String(seconds)
		let str_minutes = minutes < 10 ? `0${minutes}` : minutes
		let str_hours = hours < 10 ? `0${hours}` : hours
		if (hours == 0) {
			return `${str_minutes}:${str_seconds}`
		}
		return `${str_hours}:${str_minutes}:${str_seconds}`
	}

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 10
	}

	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 10
	}

	const handleCurrentTime = (e: string) => {
		if (videoRef.current) videoRef.current.currentTime = Number(e)
	}

	const PictureInPicture = () => {
		const video = videoRef.current

		if (!video) return
		video.controls

		if (video.requestPictureInPicture) {
			video.requestPictureInPicture()
		}
	}

	const fullScreen = useCallback(() => {
		const video = videoRef.current

		if (!video) return

		setIsFullScreen(!isFullScreen)

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}, [isFullScreen, setIsFullScreen])

	// установка текущего времени
	useEffect(() => {
		const video = videoRef.current

		if (!video) return

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoDuration) * 100)
		}

		video.addEventListener('timeupdate', updateProgress)

		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoDuration])

	// если конец видео
	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		video.addEventListener('ended', toggleVideo)

		return () => {
			video.removeEventListener('ended', toggleVideo)
		}
	}, [toggleVideo])

	// клавиши
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight': {
					forward()
					break
				}

				case 'ArrowLeft': {
					revert()
					break
				}

				case ' ': {
					e.preventDefault()
					toggleVideo()
					break
				}

				case 'f': {
					fullScreen()
					break
				}

				default: {
					return
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo, fullScreen])

	//наведение на timeLine
	useEffect(() => {
		const video = videoRef.current
		const videoDurationLine = timeLineRef.current
		const progressTime = progressTimeRef.current

		if (!video) return
		if (!videoDurationLine) return
		if (!progressTime) return

		const resetTimeText = (e: MouseEvent) => {
			e.preventDefault()
			let timelineWidth = videoDurationLine.clientWidth
			let offsetX = e.offsetX
			let percent = Math.floor((offsetX / timelineWidth) * videoDuration)
			offsetX =
				offsetX < 20
					? 20
					: offsetX > timelineWidth - 20
						? timelineWidth - 20
						: offsetX
			progressTime.style.left = `${offsetX}px`
			progressTime.innerText = formatTime(percent)
		}

		videoDurationLine.addEventListener('mousemove', e => resetTimeText(e))

		return () => {
			videoDurationLine.removeEventListener('mousemove', e => resetTimeText(e))
		}
	}, [videoDuration])

	// нажатие на timeLine (seekTo)
	useEffect(() => {
		const video = videoRef.current
		const videoDurationLine = timeLineRef.current

		if (!video || !videoDurationLine) return

		videoDurationLine.addEventListener('click', e => {
			e.preventDefault()
			let timelineWidth = videoDurationLine.clientWidth
			video.currentTime = (e.offsetX / timelineWidth) * videoDuration
		})

		return () => {
			videoDurationLine.removeEventListener('click', e => {
				e.preventDefault()
				let timelineWidth = videoDurationLine.clientWidth
				video.currentTime = (e.offsetX / timelineWidth) * video.duration
			})
		}
	}, [videoRef, timeLineRef, videoDuration])

	// удерживать timeLine
	useEffect(() => {
		const video = videoRef.current
		const videoDurationLine = timeLineRef.current
		const progressTime = progressTimeRef.current
		const playProgressBar = playProgressBarRef.current

		if (!video || !videoDurationLine || !progressTime || !playProgressBar)
			return

		const draggableProgressBar = (e: MouseEvent) => {
			e.preventDefault()
			let timelineWidth = videoDurationLine.clientWidth
			playProgressBar.style.width = `${e.offsetX}px`
			video.currentTime = (e.offsetX / timelineWidth) * videoDuration
			setCurrentTime(video.currentTime)
		}

		videoDurationLine.addEventListener('mousedown', () => {
			videoDurationLine.addEventListener('mousemove', draggableProgressBar)
			window.addEventListener(
				'mouseup',
				() => {
					videoDurationLine.removeEventListener(
						'mousemove',
						draggableProgressBar
					)
				},
				{ once: true }
			)
		})

		return () => {
			videoDurationLine.removeEventListener('mousedown', () => {
				videoDurationLine.removeEventListener('mousemove', draggableProgressBar)
			})
		}
	}, [
		setCurrentTime,
		videoRef,
		timeLineRef,
		progressTimeRef,
		playProgressBarRef,
		videoDuration,
	])

	//play progress
	useEffect(() => {
		const video = videoRef.current
		const playProgress = playProgressBarRef.current
		if (!video || !playProgress) return

		const updateProgress = () => {
			if (playProgress && videoDuration > 0) {
				playProgress.style.width = `${
					(video.currentTime / videoDuration) * 100
				}%`
			}
		}

		video.addEventListener('timeupdate', updateProgress)

		return () => {
			video.addEventListener('timeupdate', updateProgress)
		}
	}, [videoRef, playProgressBarRef, videoDuration])

	// buffer progress
	useEffect(() => {
		const video = videoRef.current
		const bufferProgress = bufferProgressBarRef.current
		if (!video || !bufferProgress) return

		const onProgress = () => {
			if (!video.buffered.length) return
			const bufferedEnd = video.buffered.end(video.buffered.length - 1)
			if (bufferProgress && videoDuration > 0) {
				bufferProgress.style.width = `${(bufferedEnd / videoDuration) * 100}%`
			}
		}

		video.addEventListener('progress', onProgress)

		return () => {
			video.removeEventListener('progress', onProgress)
		}
	}, [videoRef.current?.buffered, bufferProgressBarRef, videoDuration])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		video.addEventListener('waiting', onWaiting)
		video.addEventListener('playing', onPlay)
		video.addEventListener('pause', onPause)

		return () => {
			video.removeEventListener('waiting', onWaiting)
			video.removeEventListener('playing', onPlay)
			video.removeEventListener('pause', onPause)
		}
	}, [videoRef, onWaiting, onPlay, onPause])

	const value = useMemo(
		() => ({
			videoRef,
			timeLineRef,
			progressTimeRef,
			playProgressBarRef,
			bufferProgressBarRef,
			actions: {
				fullScreen,
				PictureInPicture,
				revert,
				forward,
				handleCurrentTime,
				toggleVideo,
			},
			video: {
				isPlaying,
				isFullScreen,
				currentTime,
				progress,
				videoDuration,
			},
		}),
		[
			currentTime,
			progress,
			isPlaying,
			videoDuration,
			toggleVideo,
			isFullScreen,
			fullScreen,
		]
	)

	return value
}
