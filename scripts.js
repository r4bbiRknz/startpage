/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"PouYujEeSJLWP6Eg","label":"school","bookmarks":[{"id":"drPN8nV2MK2k5ECW","label":"mail","url":"https://mail.google.com/mail/u/1/#inbox"},{"id":"PmWQiuLmlM8jsBEo","label":"classroom","url":"https://classroom.google.com/u/1/"},{"id":"2QE54JT9sXB9jlQS","label":"drive","url":"https://drive.google.com/drive/u/0/my-drive"}]},{"id":"34mXSZrtS4W4Qn8M","label":"personal","bookmarks":[{"id":"kHA93TvZ4V2jUJVw","label":"instagram","url":"https://www.instagram.com/direct/inbox/"},{"id":"k1JuSacGNifTF4vv","label":"messenger","url":"https://www.messenger.com/t"},{"id":"29fpJV9qRz31oPEn","label":"whatsapp","url":"https://web.whatsapp.com/"}]},{"id":"lHSBKjutDZZhfKKS","label":"media","bookmarks":[{"id":"YHO94T68wFgttZcG","label":"youtube","url":"https://www.youtube.com/"},{"id":"EsVI7NJCVOUWWRZb","label":"netflix","url":"https://www.netflix.com/browse"}]},{"id":"fR1BRGCYD4DjBAIm","label":"sources","bookmarks":[{"id":"jMZNsGBH9vmHcDOy","label":"icons","url":"https://feathericons.com/"},{"id":"or6g4q08v8VXpjV4","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"vWZk7RIiysyYFDQ1","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"IL5kKH2QwNfP8YNU","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
