const handle = promise => {
  return promise
    .then(data => [data, undefined])
    .catch(error => ([undefined, error]))
}
