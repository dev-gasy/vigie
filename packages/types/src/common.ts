// Add your common types here
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
