const worker = new Worker(new URL('./work.js', import.meta.url))

worker.postMessage({
  question: "hi, 那边的worker线程，今天的幸运数字多少？"
})

worker.onmessage = (message) => {
  console.log(message.data.answer);
}