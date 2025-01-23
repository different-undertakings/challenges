"use strict";
/**
 * Implementation 1: Iterative Solution
 *
 * Complexity:
 * - Time Complexity: 𝑂(n)  - the function iterates through all integers from 1 to n.
 * - Space Complexity: 𝑂(1) - no additional memory is required beyond the sum variable.
 */
const sum_to_n_a = (n) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
/**
 * Implementation 2: Mathematical Formula
 *
 * Complexity:
 * - Time Complexity: 𝑂(1) - the result is calculated directly using a constant-time mathematical formula.
 * - Space Complexity: 𝑂(1)  - no additional memory is required.
 */
const sum_to_n_b = (n) => {
    return (n * (n + 1)) / 2;
};
/**
 * Implementation 3: Recursive Solution
 *
 * Complexity:
 * - Time Complexity: 𝑂(n)  - the function makes n recursive calls.
 * - Space Complexity: 𝑂(n) - Each recursive call adds a new frame to the call stack.
 */
function sum_to_n_c(n) {
    if (n <= 0)
        return 0;
    return n + sum_to_n_c(n - 1);
}
// Usage
const n = 5;
const imp1 = sum_to_n_a(n);
const imp2 = sum_to_n_b(n);
const imp3 = sum_to_n_c(n);
console.log({ imp1, imp2, imp3 });
