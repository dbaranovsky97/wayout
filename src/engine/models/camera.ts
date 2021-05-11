export interface CameraConfig {
    /**
     * Область видимости на расстоянии 1 метр
     */
    viewport: {
        width: number,
        height: number
    },
    /**
     * Показывает на сколько увеличивается область видимости при увеличении дистанции на 1 метр
     */
    perspective: number
}