# @kakao/capacitor-kakao-login

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

[npm-url]: https://npmjs.org/package/@kakao/capacitor-kakao-login
[downloads-image]: http://img.shields.io/npm/dm/@kakao/capacitor-kakao-login.svg
[npm-image]: http://img.shields.io/npm/v/@kakao/capacitor-kakao-login.svg

## Install

```bash
npm install @kakao/capacitor-kakao-login
npx cap sync
```

## Using npm link

To use this project locally with `npm link`, follow these steps:

1. Build the project:

   ```sh
   npm run build
   ```

2. Link the project globally:

   ```sh
   npm link
   ```

3. Link the project in your target project:
   ```sh
   cd /path/to/your/target/project
   npm link capacitor-kakao-login
   ```

## API

<docgen-index>

* [`goLogin()`](#gologin)
* [`goLogout()`](#gologout)
* [`getUserInfo()`](#getuserinfo)
* [`sendLinkFeed(...)`](#sendlinkfeed)
* [`talkInChannel(...)`](#talkinchannel)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### goLogin()

```typescript
goLogin() => Promise<{ accessToken: string; expiredAt: string; expiresIn: string; refreshToken: string; idToken: string; refreshTokenExpiredAt: string; refreshTokenExpiresIn: string; tokenType: string; }>
```

**Returns:** <code>Promise&lt;{ accessToken: string; expiredAt: string; expiresIn: string; refreshToken: string; idToken: string; refreshTokenExpiredAt: string; refreshTokenExpiresIn: string; tokenType: string; }&gt;</code>

--------------------


### goLogout()

```typescript
goLogout() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getUserInfo()

```typescript
getUserInfo() => Promise<{ value: any; }>
```

**Returns:** <code>Promise&lt;{ value: any; }&gt;</code>

--------------------


### sendLinkFeed(...)

```typescript
sendLinkFeed(options: { title: string; description: string; imageUrl: string; link: string; imageLinkUrl: string; buttonTitle: string; imageWidth?: number; imageHeight?: number; }) => Promise<void>
```

| Param         | Type                                                                                                                                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ title: string; description: string; imageUrl: string; link: string; imageLinkUrl: string; buttonTitle: string; imageWidth?: number; imageHeight?: number; }</code> |

--------------------


### talkInChannel(...)

```typescript
talkInChannel(options: { publicId: string; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ publicId: string; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------

</docgen-api>
# capacitor-kakao
