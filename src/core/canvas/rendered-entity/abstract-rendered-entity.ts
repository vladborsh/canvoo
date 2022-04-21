export interface AbstractRenderedEntity {
  render: (dt: number, entity: AbstractRenderedEntity) => void;
  layer: number,
  isActive: boolean,
}
