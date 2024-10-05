export let isMock = true 

function toggleMockMode() {
  isMock = !isMock
}

function getMockMode() {
  return isMock
}

module.exports = {
  toggleMockMode: toggleMockMode,
  getMockMode: getMockMode,
}

export default {
  toggleMockMode,
  getMockMode,
}