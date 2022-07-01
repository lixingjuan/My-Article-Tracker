const button = document.createElement("button");
button.innerHTML = "click me";
document.body.appendChild(button);

button.addEventListener("click", function () {
  console.log('hello, world!');
})


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
      console.log(' SW 注册成功', registration );
      })
      .catch(err => {
      console.log(' SW 注册失败',err);
    })
  })
}