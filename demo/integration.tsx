import React, { useEffect } from 'react'
import { indicate, remove } from 'indicate'
import { Button } from 'markup/Button'

const initializeFadeEffect = () => {
  indicate('.integration', {
    inlineStyles: {
      innerWrapper: {
        gap: '10px',
        marginTop: '10px',
        marginBottom: '10px',
      },
    },
  })
}

const removeFadeEffect = () => remove('.integration')

const toggleTestCases = () => {
  if (document.querySelector('.hide-indicate-scrollbar')) {
    removeFadeEffect()
  } else {
    initializeFadeEffect()
  }
}

export const Integrations = () => {
  useEffect(initializeFadeEffect)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>New York Times</h2>
        <Button id="toggle" color="green" onClick={toggleTestCases}>
          Toggle Effect
        </Button>
      </div>
      <style>
        {`@font-face {
          font-family: 'nyt-franklin';
          src: url('https://g1.nyt.com/fonts/family/franklin/franklin-normal-500.d6c06a3d84a57100edad5bf9b84ff739.woff2') format('woff2');
        }`}
      </style>
      <header
        style={{
          fontFamily: 'nyt-franklin,helvetica,arial,sans-serif',
          maxWidth: 1000,
        }}
      >
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <ul
            style={{
              width: '50%',
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              whiteSpace: 'nowrap',
              gap: 10,
            }}
          >
            <li>U.S.</li>
            <li>International</li>
            <li>Canada</li>
            <li>Español</li>
            <li>中文</li>
          </ul>
        </section>
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: 12 }}>
            <span
              style={{ display: 'flex', fontWeight: 'bold', marginBottom: 3 }}
            >
              Monday, May 3, 2021
            </span>
            <span>Today’s Paper</span>
          </div>
          <div style={{ flex: 1, maxWidth: '40%' }}>
            <svg viewBox="0 0 184 25" fill="#000">
              <path d="M13.8 2.9c0-2-1.9-2.5-3.4-2.5v.3c.9 0 1.6.3 1.6 1 0 .4-.3 1-1.2 1-.7 0-2.2-.4-3.3-.8C6.2 1.4 5 1 4 1 2 1 .6 2.5.6 4.2c0 1.5 1.1 2 1.5 2.2l.1-.2c-.2-.2-.5-.4-.5-1 0-.4.4-1.1 1.4-1.1.9 0 2.1.4 3.7.9 1.4.4 2.9.7 3.7.8v3.1L9 10.2v.1l1.5 1.3v4.3c-.8.5-1.7.6-2.5.6-1.5 0-2.8-.4-3.9-1.6l4.1-2V6l-5 2.2C3.6 6.9 4.7 6 5.8 5.4l-.1-.3c-3 .8-5.7 3.6-5.7 7 0 4 3.3 7 7 7 4 0 6.6-3.2 6.6-6.5h-.2c-.6 1.3-1.5 2.5-2.6 3.1v-4.1l1.6-1.3v-.1l-1.6-1.3V5.8c1.5 0 3-1 3-2.9zm-8.7 11l-1.2.6c-.7-.9-1.1-2.1-1.1-3.8 0-.7 0-1.5.2-2.1l2.1-.9v6.2zm10.6 2.3l-1.3 1 .2.2.6-.5 2.2 2 3-2-.1-.2-.8.5-1-1V9.4l.8-.6 1.7 1.4v6.1c0 3.8-.8 4.4-2.5 5v.3c2.8.1 5.4-.8 5.4-5.7V9.3l.9-.7-.2-.2-.8.6-2.5-2.1L18.5 9V.8h-.2l-3.5 2.4v.2c.4.2 1 .4 1 1.5l-.1 11.3zM34 15.1L31.5 17 29 15v-1.2l4.7-3.2v-.1l-2.4-3.6-5.2 2.8v6.6l-1 .8.2.2.9-.7 3.4 2.5 4.5-3.6-.1-.4zm-5-1.7V8.5l.2-.1 2.2 3.5-2.4 1.5zM53.1 2c0-.3-.1-.6-.2-.9h-.2c-.3.8-.7 1.2-1.7 1.2-.9 0-1.5-.5-1.9-.9l-2.9 3.3.2.2 1-.9c.6.5 1.1.9 2.5 1v8.3L44 3.2c-.5-.8-1.2-1.9-2.6-1.9-1.6 0-3 1.4-2.8 3.6h.3c.1-.6.4-1.3 1.1-1.3.5 0 1 .5 1.3 1v3.3c-1.8 0-3 .8-3 2.3 0 .8.4 2 1.6 2.3v-.2c-.2-.2-.3-.4-.3-.7 0-.5.4-.9 1.1-.9h.5v4.2c-2.1 0-3.8 1.2-3.8 3.2 0 1.9 1.6 2.8 3.4 2.7v-.2c-1.1-.1-1.6-.6-1.6-1.3 0-.9.6-1.3 1.4-1.3.8 0 1.5.5 2 1.1l2.9-3.2-.2-.2-.7.8c-1.1-1-1.7-1.3-3-1.5V5l8 14h.6V5c1.5-.1 2.9-1.3 2.9-3zm7.3 13.1L57.9 17l-2.5-2v-1.2l4.7-3.2v-.1l-2.4-3.6-5.2 2.8v6.6l-1 .8.2.2.9-.7 3.4 2.5 4.5-3.6-.1-.4zm-5-1.7V8.5l.2-.1 2.2 3.5-2.4 1.5zM76.7 8l-.7.5-1.9-1.6-2.2 2 .9.9v7.5l-2.4-1.5V9.6l.8-.5-2.3-2.2-2.2 2 .9.9V17l-.3.2-2.1-1.5v-6c0-1.4-.7-1.8-1.5-2.3-.7-.5-1.1-.8-1.1-1.5 0-.6.6-.9.9-1.1v-.2c-.8 0-2.9.8-2.9 2.7 0 1 .5 1.4 1 1.9s1 .9 1 1.8v5.8l-1.1.8.2.2 1-.8 2.3 2 2.5-1.7 2.8 1.7 5.3-3.1V9.2l1.3-1-.2-.2zm18.6-5.5l-1 .9-2.2-2-3.3 2.4V1.6h-.3l.1 16.2c-.3 0-1.2-.2-1.9-.4l-.2-13.5c0-1-.7-2.4-2.5-2.4s-3 1.4-3 2.8h.3c.1-.6.4-1.1 1-1.1s1.1.4 1.1 1.7v3.9c-1.8.1-2.9 1.1-2.9 2.4 0 .8.4 2 1.6 2V13c-.4-.2-.5-.5-.5-.7 0-.6.5-.8 1.3-.8h.4v6.2c-1.5.5-2.1 1.6-2.1 2.8 0 1.7 1.3 2.9 3.3 2.9 1.4 0 2.6-.2 3.8-.5 1-.2 2.3-.5 2.9-.5.8 0 1.1.4 1.1.9 0 .7-.3 1-.7 1.1v.2c1.6-.3 2.6-1.3 2.6-2.8s-1.5-2.4-3.1-2.4c-.8 0-2.5.3-3.7.5-1.4.3-2.8.5-3.2.5-.7 0-1.5-.3-1.5-1.3 0-.8.7-1.5 2.4-1.5.9 0 2 .1 3.1.4 1.2.3 2.3.6 3.3.6 1.5 0 2.8-.5 2.8-2.6V3.7l1.2-1-.2-.2zm-4.1 6.1c-.3.3-.7.6-1.2.6s-1-.3-1.2-.6V4.2l1-.7 1.4 1.3v3.8zm0 3c-.2-.2-.7-.5-1.2-.5s-1 .3-1.2.5V9c.2.2.7.5 1.2.5s1-.3 1.2-.5v2.6zm0 4.7c0 .8-.5 1.6-1.6 1.6h-.8V12c.2-.2.7-.5 1.2-.5s.9.3 1.2.5v4.3zm13.7-7.1l-3.2-2.3-4.9 2.8v6.5l-1 .8.1.2.8-.6 3.2 2.4 5-3V9.2zm-5.4 6.3V8.3l2.5 1.8v7.1l-2.5-1.7zm14.9-8.4h-.2c-.3.2-.6.4-.9.4-.4 0-.9-.2-1.1-.5h-.2l-1.7 1.9-1.7-1.9-3 2 .1.2.8-.5 1 1.1v6.3l-1.3 1 .2.2.6-.5 2.4 2 3.1-2.1-.1-.2-.9.5-1.2-1V9c.5.5 1.1 1 1.8 1 1.4.1 2.2-1.3 2.3-2.9zm12 9.6L123 19l-4.6-7 3.3-5.1h.2c.4.4 1 .8 1.7.8s1.2-.4 1.5-.8h.2c-.1 2-1.5 3.2-2.5 3.2s-1.5-.5-2.1-.8l-.3.5 5 7.4 1-.6v.1zm-11-.5l-1.3 1 .2.2.6-.5 2.2 2 3-2-.2-.2-.8.5-1-1V.8h-.1l-3.6 2.4v.2c.4.2 1 .3 1 1.5v11.3zM143 2.9c0-2-1.9-2.5-3.4-2.5v.3c.9 0 1.6.3 1.6 1 0 .4-.3 1-1.2 1-.7 0-2.2-.4-3.3-.8-1.3-.4-2.5-.8-3.5-.8-2 0-3.4 1.5-3.4 3.2 0 1.5 1.1 2 1.5 2.2l.1-.2c-.3-.2-.6-.4-.6-1 0-.4.4-1.1 1.4-1.1.9 0 2.1.4 3.7.9 1.4.4 2.9.7 3.7.8V9l-1.5 1.3v.1l1.5 1.3V16c-.8.5-1.7.6-2.5.6-1.5 0-2.8-.4-3.9-1.6l4.1-2V6l-5 2.2c.5-1.3 1.6-2.2 2.6-2.9l-.1-.2c-3 .8-5.7 3.5-5.7 6.9 0 4 3.3 7 7 7 4 0 6.6-3.2 6.6-6.5h-.2c-.6 1.3-1.5 2.5-2.6 3.1v-4.1l1.6-1.3v-.1L140 8.8v-3c1.5 0 3-1 3-2.9zm-8.7 11l-1.2.6c-.7-.9-1.1-2.1-1.1-3.8 0-.7.1-1.5.3-2.1l2.1-.9-.1 6.2zm12.2-12h-.1l-2 1.7v.1l1.7 1.9h.2l2-1.7v-.1l-1.8-1.9zm3 14.8l-.8.5-1-1V9.3l1-.7-.2-.2-.7.6-1.8-2.1-2.9 2 .2.3.7-.5.9 1.1v6.5l-1.3 1 .1.2.7-.5 2.2 2 3-2-.1-.3zm16.7-.1l-.7.5-1.1-1V9.3l1-.8-.2-.2-.8.7-2.3-2.1-3 2.1-2.3-2.1L154 9l-1.8-2.1-2.9 2 .1.3.7-.5 1 1.1v6.5l-.8.8 2.3 1.9 2.2-2-.9-.9V9.3l.9-.6 1.5 1.4v6l-.8.8 2.3 1.9 2.2-2-.9-.9V9.3l.8-.5 1.6 1.4v6l-.7.7 2.3 2.1 3.1-2.1v-.3zm8.7-1.5l-2.5 1.9-2.5-2v-1.2l4.7-3.2v-.1l-2.4-3.6-5.2 2.8v6.8l3.5 2.5 4.5-3.6-.1-.3zm-5-1.7V8.5l.2-.1 2.2 3.5-2.4 1.5zm14.1-.9l-1.9-1.5c1.3-1.1 1.8-2.6 1.8-3.6v-.6h-.2c-.2.5-.6 1-1.4 1-.8 0-1.3-.4-1.8-1L176 9.3v3.6l1.7 1.3c-1.7 1.5-2 2.5-2 3.3 0 1 .5 1.7 1.3 2l.1-.2c-.2-.2-.4-.3-.4-.8 0-.3.4-.8 1.2-.8 1 0 1.6.7 1.9 1l4.3-2.6v-3.6h-.1zm-1.1-3c-.7 1.2-2.2 2.4-3.1 3l-1.1-.9V8.1c.4 1 1.5 1.8 2.6 1.8.7 0 1.1-.1 1.6-.4zm-1.7 8c-.5-1.1-1.7-1.9-2.9-1.9-.3 0-1.1 0-1.9.5.5-.8 1.8-2.2 3.5-3.2l1.2 1 .1 3.6z"></path>
            </svg>
          </div>
          <div style={{ fontSize: 12 }}>
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                marginBottom: 5,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 32 33">
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M19.001 10.401c0 4.949-4.051 9-9 9s-9-4.051-9-9 4.051-9 9-9 9 4.051 9 9"
                    fill="#F4D864"
                  ></path>
                  <path
                    d="M19.001 10.401c0 4.949-4.051 9-9 9s-9-4.051-9-9 4.051-9 9-9 9 4.051 9 9z"
                    stroke="#F4D864"
                    strokeWidth="2"
                  ></path>
                  <path
                    d="M6.608 31.349c-2.893 0-5.246-2.328-5.246-5.189 0-2.863 2.353-5.193 5.246-5.193h1.033l.408-1.002c.723-3.771 4.066-6.51 7.951-6.51 3.881 0 7.223 2.738 7.945 6.51l.207 1.07 1.109-.059c3.033 0 5.377 2.328 5.377 5.184 0 2.861-2.353 5.189-5.248 5.189H6.608z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M16.001 14.704c3.281 0 6.107 2.309 6.717 5.494l.402 2.092 2.131-.064.09-.006.051-.004c2.203 0 3.996 1.768 3.996 3.941 0 2.174-1.793 3.941-3.996 3.941H6.606c-2.201 0-3.994-1.767-3.994-3.941s1.793-3.941 3.959-3.941l.109.008h.029l2.16.096.406-2.121c.613-3.186 3.439-5.495 6.726-5.495m0-2.5c-4.566 0-8.357 3.236-9.178 7.523-.072-.004-.142-.012-.217-.012-3.588 0-6.494 2.883-6.494 6.441 0 3.561 2.906 6.441 6.494 6.441h18.785c3.59 0 6.496-2.881 6.496-6.441 0-3.559-2.906-6.441-6.496-6.441-.072 0-.145.008-.217.012-.821-4.287-4.614-7.523-9.173-7.523"
                    fill="#ccc"
                  ></path>
                </g>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 'bold' }}>18°C</span>
              <span style={{ fontSize: 12 }}>
                18° <span style={{ color: 'gray', fontSize: 10 }}>8°</span>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span>S&amp;P 500</span>
              <span>-0.72%</span>
              <svg
                width="5px"
                height="9px"
                viewBox="0 0 5 9"
                style={{ transform: 'rotate(180deg)' }}
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="Artboard">
                    <g id="Group">
                      <path
                        d="M2.5,9 L2.5,3.373"
                        id="Shape"
                        stroke="#a61b1e"
                      ></path>
                      <polyline
                        id="Shape"
                        fill="#a61b1e"
                        fillRule="nonzero"
                        points="4.86293961 4.09179688 2.5 0 0.13706039 4.09179688"
                      ></polyline>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </section>
        <div
          style={{
            borderTop: '1px solid lightgray',
            borderBottom: '1px solid black',
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              whiteSpace: 'nowrap',
            }}
            className="integration"
          >
            <li>World</li>
            <li>U.S.</li>
            <li>Politics</li>
            <li>N.Y.</li>
            <li>Business</li>
            <li>Opinion</li>
            <li>Tech</li>
            <li>Science</li>
            <li>Health</li>
            <li>Sports</li>
            <li>Arts</li>
            <li>Books</li>
            <li>Style</li>
            <li>Food</li>
            <li>Travel</li>
            <li>Magazine</li>
            <li>T Magazine</li>
            <li>Real Estate</li>
            <li>Video</li>
          </ul>
        </div>
      </header>
    </>
  )
}
