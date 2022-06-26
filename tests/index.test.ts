import { describe, expect, it } from 'vitest'
import add from '../src/index'

describe('add', () => {
  it('expect 1 + 1 = 2', () => {
    expect(add(1, 1)).toEqual(2)
  })
})
