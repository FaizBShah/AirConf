// Function to return the current width of the chat drawer
export const getChatWidth = (width) => {
  return width > 768 ? '300px' : width > 600 ? '240px' : '100%';
}