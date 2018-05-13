/**
 * Returns the border widths for all directions.
 **/
export default element => {
  const styles = window.getComputedStyle(element)

  return {
    top: parseInt(styles.borderTop || styles.borderTopWidth || 0),
    right: parseInt(styles.borderRight || styles.borderRightWidth || 0),
    bottom: parseInt(styles.borderBottom || styles.borderBottomWidth || 0),
    left: parseInt(styles.borderLeft || styles.borderLeftWidth || 0)
  }
}
