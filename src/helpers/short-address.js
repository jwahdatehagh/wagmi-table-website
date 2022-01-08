const shortAddress = address => address &&
  (
    address.substr(0, 6) +
    '...' +
    address.substr(address.length - 4, 4)
  ) || ''

export default shortAddress
