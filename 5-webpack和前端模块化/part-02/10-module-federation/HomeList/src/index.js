import HomeList from './HomeList';

import("nav/Header")
  .then(({default: nav}) => {
    console.log({nav});
    document.body.innerHTML = HomeList(10)
    document.body.appendChild(nav())
  })

