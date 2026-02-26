const pairs = {
  ')': '(',
  ']': '[',
  '}': '{',
}

/**
 * 문자열을 순회하면서
 * 문자가 스택의 top과 짝이 맞는다면 pop해서 삭제하고,
 * 그렇지 않다면 스택에 삽입합니다.
 */
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
