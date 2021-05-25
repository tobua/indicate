# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/tobua/indicate/compare/v2.3.1...v3.0.0) (2021-05-25)


### ⚠ BREAKING CHANGES

* **style:** full plugin rewrite in TypeScript, new API and iframe support dropped

### Features

* **arrow:** different types of arrow configuration ([d6be5bd](https://github.com/tobua/indicate/commit/d6be5bde11a0ccc697145d9b49aa3828e8b69e63))
* **click:** configurable scroll denominator ([6371e03](https://github.com/tobua/indicate/commit/6371e03ad34f551f6c777056bb5b9268fd30b58b))
* **click:** implement indicator scoll on click functionality ([3edc537](https://github.com/tobua/indicate/commit/3edc537366465134b667b0367fe30b1c40754c18))
* **demo:** add integration tab along with first example ([dee361d](https://github.com/tobua/indicate/commit/dee361d5a24c2e9943c68f438b1440953b5634f5))
* **demo:** update papua version and basic demo ([91d5cf6](https://github.com/tobua/indicate/commit/91d5cf66d211670e18bff64eb5ab8b824a080ccb))
* **element:** add vertical indicator ([45c2538](https://github.com/tobua/indicate/commit/45c25387c38a20a2cfce83a35c63672fccdb51a8))
* **element:** implement arrow element with styles ([8962bef](https://github.com/tobua/indicate/commit/8962befc63650004f67238771bd5c84c1e003a00))
* **fade:** implement basic fade functionality using an observer ([e84a1a6](https://github.com/tobua/indicate/commit/e84a1a646e7d703777f981005887d56fac0cfbd1))
* **icon:** selection of several arrow icons and colors possible ([d6f47d9](https://github.com/tobua/indicate/commit/d6f47d9f1ef4d85431e9a859fa193c733681e1be))
* **instance:** implement remove, better structure and fix demo ([c2bacfa](https://github.com/tobua/indicate/commit/c2bacfae94026142b98592c8dc1578bcaa0d4d01))
* **options:** simple way to add inline-styles and improve integration ([2433449](https://github.com/tobua/indicate/commit/243344952962924e6bd008b16c049499244f3b0f))
* **react:** add basic hook for usage with React ([f872d89](https://github.com/tobua/indicate/commit/f872d89b537ae4e5091b10a6e6f49a4e63e1cdfb))
* **scrollbar:** hide native scrollbar if desired ([153b68a](https://github.com/tobua/indicate/commit/153b68a8552faa1b01031442416f37d7cc2b1255))
* **style:** configurable alignment styles ([143c4a1](https://github.com/tobua/indicate/commit/143c4a1f46742ed63ab6bb0a03ab2320393eec9a))
* **style:** configurable arrow position ([20ecd0c](https://github.com/tobua/indicate/commit/20ecd0c9101714585ebf4f4e016f51b24ec55dd6))
* **style:** create and apply theme to indicator styles ([d0f533a](https://github.com/tobua/indicate/commit/d0f533abd5234f6212690003f5215497b90ca7af))
* **style:** implement basic elements and wrapper ([51608c9](https://github.com/tobua/indicate/commit/51608c9c0af17f7ecd855b3bbb21192ccda1fadc))
* **style:** move element styles and class optionally to wrapper ([81cdb7d](https://github.com/tobua/indicate/commit/81cdb7dbdda7b0627dd4bd0117002a63263054d4))
* **table:** custom element structure to support table elements ([9e0a5b3](https://github.com/tobua/indicate/commit/9e0a5b31f9b8ffc061c63f0dde64781e79ba0c8d))
* **theme:** add theme functionality to configure element styles ([b4a1994](https://github.com/tobua/indicate/commit/b4a199415557a6986ea301e44ccebf425e958fae))
* **theme:** theme integration into demo ([c797cd5](https://github.com/tobua/indicate/commit/c797cd5d2c244115d0d0bba6961543c1af6558ea))
* **types:** store and pass typed instance ([be0f266](https://github.com/tobua/indicate/commit/be0f2666b21f1f989e7ef00802f969270aedda79))


### Bug Fixes

* **click:** improve tests and make sure click also works on tables ([724346c](https://github.com/tobua/indicate/commit/724346c36f84207e8dc0f393c3ae7728e194bf26))
* **demo:** better table styling, fix vertical and constant plugin props ([1d7d8fa](https://github.com/tobua/indicate/commit/1d7d8fa742b714a4b4c593b9ea71e08eab1f3a11))
* **demo:** proper content direction when several rows present ([7b9293b](https://github.com/tobua/indicate/commit/7b9293b7a3c52293ca44faa10ba69a830854bd05))
* **element:** content wrapper to properly position observers ([4d3a200](https://github.com/tobua/indicate/commit/4d3a200a0d0e632557ff682e569c850e4ac127d7))
* **general:** remove on wrapper selector, code preview & tabs navigation ([9407571](https://github.com/tobua/indicate/commit/94075713dd7e97bb70fb831a18e83f18106723ca))
* **indicate-react:** add missing arrow options ([9750153](https://github.com/tobua/indicate/commit/9750153028c6dc3393b4bb6e0b5c9f84301565c5))
* **indicate-react:** add typed props ([9c3f0f6](https://github.com/tobua/indicate/commit/9c3f0f6b5d7a981f26915f24ce5669cc8e59e30e))
* **inline:** custom styles for inline elements and tests ([11a8e40](https://github.com/tobua/indicate/commit/11a8e40d01cae0e63484352dfbc372aec80852f3))
* **observer:** fix observer visibility logic ([41f095c](https://github.com/tobua/indicate/commit/41f095cb47ccd41258b3dc38d9d801c5d6aa9468))
* **overflow:** move styles optional and test case for minimal overflow ([3b42b86](https://github.com/tobua/indicate/commit/3b42b86828e9c7dc46e2c63f793136b60ebe92e4))
* **react:** proper plugin lifecycle and demo styles ([f08048b](https://github.com/tobua/indicate/commit/f08048b062c42ba1d66645592ef2a51b9655b648))
* **react:** type issue and remove old plugin ([8731866](https://github.com/tobua/indicate/commit/8731866d096b163f2931e2266fa7464361ab4875))
* **setup:** make log tree-shakable, improve doc and consistent interface ([498340a](https://github.com/tobua/indicate/commit/498340a9683c536a3256767e14d385106cf19460))
* **style:** improve responsive layout and fix wrap ([4339305](https://github.com/tobua/indicate/commit/4339305c51e9d7331c3edef3cfc59601f45d5e34))
* **style:** remove unnecessary space, ensure disappear and test remove ([20361a3](https://github.com/tobua/indicate/commit/20361a3599ce75c89b66a39cc06133ef892a59c7))
* **theme:** show animation again and add scrollbar test ([21a736d](https://github.com/tobua/indicate/commit/21a736d13e0be4b66326308b67808ecb188587bc))
* **types:** proper type for inferred types ([e479c2f](https://github.com/tobua/indicate/commit/e479c2ff653a9a0d8884bad8f61a30b12d34af2a))


* **style:** refactor styles and add indicator animations ([c14ea58](https://github.com/tobua/indicate/commit/c14ea5852099d880be2398bf4996f3a3e4f32b5b))
