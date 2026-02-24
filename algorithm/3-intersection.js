function solution(nums1, nums2) {
  const set1 = new Set(nums1)
  const set2 = new Set(nums2)

  const result = Array.from(set1).filter(n => set2.has(n))

  return result
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
