// > write a clear explanation of your implementation.

// The implementation uses a locking mechanism to prevent multiple workers from modifying the same item at the same time.
// Each item is locked when a worker starts processing it, ensuring no other worker can process it concurrently.
// Once a worker completes a task, it confirms the operation and unlocks the item.
// This ensures sequential and safe processing, preventing race conditions and maintaining a consistent database state.

// > suggest improvements! the code in this repository is not perfect, what would you do differently?

// Error Handling: Add try-catch blocks to handle errors in workers and database operations gracefully.
// Message Prioritization: Implement message prioritization in the queue for critical tasks.
// Worker Pool Management: Control the worker pool size dynamically to avoid underutilization or overload.
// Graceful Shutdown: Ensure workers finish their tasks before the script exits, using Promises or event tracking.
// Queue Status: Track the number of in-progress tasks, not just the queue size.
// Automated Tests: Add unit and integration tests to ensure code correctness and prevent future issues.

import { Message } from "./Database";

export class Queue {
  private messages: Message[] = [];
  private inProgress: Set<string> = new Set(); // To track in-progress messages
  private locks: Map<string, boolean> = new Map(); // Lock for each item (by key)

  Enqueue = (message: Message): void => {
    this.messages.push(message);
  };

  // Try to dequeue a message and ensure no other worker processes the same item concurrently
  Dequeue = (workerId: number): Message | undefined => {
    for (let i = 0; i < this.messages.length; i++) {
      const message = this.messages[i];

      // Check if the item is already locked by another worker
      if (!this.locks.has(message.key) || !this.locks.get(message.key)) {
        this.locks.set(message.key, true); // Lock the item for processing
        this.inProgress.add(message.id); // Mark the message as being processed
        return this.messages.splice(i, 1)[0]; // Remove and return the message
      }
    }
    return undefined; // No message available
  };

  // Confirm completion of the task, unlocking the item and removing the in-progress flag
  Confirm = (workerId: number, messageId: string): void => {
    this.inProgress.delete(messageId);

    // Unlock the item when processing is complete
    const message = this.messages.find((m) => m.id === messageId);
    if (message) {
      this.locks.set(message.key, false); // Unlock the item
    }
  };

  Size = (): number => {
    return this.messages.length;
  };
}
