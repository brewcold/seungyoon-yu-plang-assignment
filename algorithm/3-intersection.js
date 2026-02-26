/**
 * 배열 두 개를 set으로 만들어 내부에서 중복을 한 번 제거하고,
 * 두 set 중 하나를 배열로 만들어 순회하면서
 * 다른 set에 같은 원소가 있는지를 확인합니다.
 */
function solution(nums1, nums2) {
  const set1 = new Set(nums1)
  const set2 = new Set(nums2)

  return Array.from(set1).filter(n => set2.has(n))
}

const tc = [
  [
    [1, 2, 2, 1],
    [2, 2],
  ],
  [
    [4, 9, 5],
    [9, 4, 9, 8, 4],
  ],
]
console.log(tc.map(([arr1, arr2]) => solution(arr1, arr2)))
