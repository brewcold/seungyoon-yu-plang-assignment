/**
 * Map의 key를 이용해 중복 문자가 있는지를 판단해,
 * 중복 문자가 있다면 슬라이딩 윈도우의 시작 인덱스를 하나 뒤로 옮깁니다.
 * (start, i)까지가 슬라이딩 윈도우의 영역이 됩니다.
 * 매 루프가 끝날 때 이 길이의 최댓값을 answer에 저장합니다.
 * */
function solution(s) {
  let answer = 0
  const map = new Map() // { [문자]: index }

  let start = 0

  for (let i = 0; i < s.length; i++) {
    const char = s[i]

    //현재 문자가 Map에 존재하면
    if (map.has(char) && map.get(char) >= start) {
      answer = Math.max(answer, i - start) //최댓값 갱신
      start = map.get(char) + 1 //중복 문자 바로 다음으로 시작점 이동
    }

    map.set(char, i) //현재 문자의 위치 기록
    answer = Math.max(answer, i - start + 1) //최댓값 갱신
  }

  return answer
}

const tc = ['abcabcbb', 'bbbbb', 'pwwkew', '']

console.log(tc.map(solution))
