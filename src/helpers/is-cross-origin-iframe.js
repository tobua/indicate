// Returns the protocol of a domain.
const extractProtocol = (domain) => {
  return domain.split('/')[0]
}

// Returns the subdomain of a domain.
const extractSubdomain = (domain) => {
  return domain.split('/')[2]
}

// Extracts the domain name of a subdomain.
const extractDomainName = (subdomain) => {
  // TODO does not work for ip addresses
  const arr = subdomain.split('.')
  return arr[arr.length - 2] + '.' + arr[arr.length - 1]
}

const isExternal = (subdomainIframe) => {
  const domainName = extractDomainName(subdomainIframe)

  if (document.domain !== domainName) {
    // Not a subdomain
    return true
  }

  // It's a subdomain, adapt domain to allow accessing contents
  document.domain = domainName
  return false
}

const isDifferentDomain = (url) => {
  const protocolIframe = extractProtocol(url)
  const subdomainIframe = extractSubdomain(url)

  if (window.location.protocol !== protocolIframe || window.location.host !== subdomainIframe) {
    return isExternal(subdomainIframe)
  }

  return false
}

export default (element) => {
  const url = element.getAttribute('src')
  return isDifferentDomain(url)
}
