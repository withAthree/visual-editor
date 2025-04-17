interface BasicConfig {
  w: number
  h: number
  x: number
  y: number
  s: number
}

export interface StageConfig extends BasicConfig {
  bgColor: string
}

// 鼠标状态
export type MouseStatus = 'move';
