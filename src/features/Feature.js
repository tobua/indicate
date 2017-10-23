export default class Feature {
  constructor (options) {
    this.options = options
  }

  /**
   * Check if the feature is needed. Returns true if feature is applicable.
   **/
  static check (options) {
    return false
  }
}
