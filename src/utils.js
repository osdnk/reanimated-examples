import Animated from 'react-native-reanimated'
const {
  abs,
  add,
  color,
  cond,
  divide,
  lessThan,
  modulo,
  multiply,
  round,
  sub,
} = Animated

const empty = ''
const toUpperCase = string => string
  .split(empty)
  .map(c => c.charAt(0).toUpperCase())
  .join(empty)

const match = (condsAndResPairs, offset = 0) => {
  if (condsAndResPairs.length - offset === 1) {
    return condsAndResPairs[offset]
  } else if (condsAndResPairs.length - offset === 0) {
    return undefined
  }
  return cond(
    condsAndResPairs[offset],
    condsAndResPairs[offset + 1],
    match(condsAndResPairs, offset + 2)
  )
}

const colorHSV = (h /* 0 - 360 */, s /* 0 - 1 */, v /* 0 - 1 */) => {
  // Converts color from HSV format into RGB
  // Formula explained here: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
  const c = multiply(v, s)
  const hh = divide(h, 60)
  const x = multiply(c, sub(1, abs(sub(modulo(hh, 2), 1))))

  const m = sub(v, c)

  const colorRGB = (r, g, b) =>
    color(
      round(multiply(255, add(r, m))),
      round(multiply(255, add(g, m))),
      round(multiply(255, add(b, m)))
    )

  return match([
    lessThan(h, 60),
    colorRGB(c, x, 0),
    lessThan(h, 120),
    colorRGB(x, c, 0),
    lessThan(h, 180),
    colorRGB(0, c, x),
    lessThan(h, 240),
    colorRGB(0, x, c),
    lessThan(h, 300),
    colorRGB(x, 0, c),
    colorRGB(c, 0, x) /* else */,
  ])
}

export {
  colorHSV,
  match,
  toUpperCase,
}
