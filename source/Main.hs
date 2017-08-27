{-# LANGUAGE OverloadedStrings #-}

module Main where

import GHCJS.Marshal(fromJSVal)
import GHCJS.Foreign.Callback (Callback, syncCallback1, syncCallback1', OnBlocked(ContinueAsync))
import Data.JSString (JSString, pack)
import GHCJS.Types (JSVal, jsval)
import JavaScript.Object (create, setProp)

-- "sayHello" test:
-- Assigns a haskell callback, sayHello, to a javascript function.
-- The "js_sayHello" function is callable from javascript.

foreign import javascript unsafe "js_sayHello = $1"
    set_sayHelloCallback :: Callback a -> IO ()

foreign import javascript unsafe "js_sayHello($1)" 
    test_sayHelloCallback :: JSString -> IO ()

sayHelloTest = do
    let sayHello jv = do
            Just str <- fromJSVal jv
            print $ "(say): hello, " ++ str  -- prints to console

    sayHelloCallback <- syncCallback1 ContinueAsync sayHello
    set_sayHelloCallback sayHelloCallback
    test_sayHelloCallback $ pack "world"  


-- "getHello" test:
-- Assigns a haskell callback, getHello,  to a javascript function.
-- The getHello function constructs a javascript object and
-- returns it to the javascript caller.  The "js_getHello" function
-- is callable from javascript.

foreign import javascript unsafe "js_getHello = $1"
    set_getHelloCallback :: Callback a -> IO ()

getHelloTest = do
    let getHello jv = do
            Just str <- fromJSVal jv
            o <- create
            setProp "helloworld" (jsval $ pack $ "(get): hello, " ++ str) o
            return $ jsval o -- accessible from javascript caller.

    getHelloCallback <- syncCallback1' getHello
    set_getHelloCallback getHelloCallback

main = do
    sayHelloTest
    getHelloTest
