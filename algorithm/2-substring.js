function solution(s) {
  let answer = 0
  const map = new Map()

  let start = 0

  for (let i = 0; i < s.length; i++) {
    const char = s[i]

    if (map.has(char) && map.get(char) >= start) {
      answer = Math.max(answer, i - start)
      start = map.get(char) + 1
    }

    map.set(char, i)
    answer = Math.max(answer, i - start + 1)
  }

  return answer
}

const tc = ['abcabcbb', 'bbbbb', 'pwwkew', '']

console.log(tc.map(solution))
