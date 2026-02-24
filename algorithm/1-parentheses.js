const pairs = {
  ')': '(',
  ']': '[',
  '}': '{',
}

function solution(s) {
  const stack = []
  const top = () => stack[stack.length - 1]

  for (const char of s) {
    if (stack.length && pairs[char] === top()) stack.pop()
    else stack.push(char)
  }

  return stack.length === 0
}

const tc = ['()', '()[]{}', '(]', '([])]', '{[]}']
console.log(tc.map(solution))
