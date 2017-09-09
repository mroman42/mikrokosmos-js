{-# LANGUAGE OverloadedStrings #-}

module Main where

import GHCJS.Marshal(fromJSVal)
import GHCJS.Foreign.Callback (Callback, syncCallback1, syncCallback1', OnBlocked(ContinueAsync))
import Data.JSString (JSString, pack)
import GHCJS.Types (JSVal, jsval)
import JavaScript.Object (create, setProp)

import Lambda
import Interpreter
import Environment
import Format
import Control.Monad.State
import Data.Maybe
import Data.List
import Libraries
import Text.ParserCombinators.Parsec


-- Calling Mikrokosmos from Javascript
foreign import javascript unsafe "mikrokosmos = $1"
    set_mikrokosmos :: Callback a -> IO ()

mikroCall = do
    let getMikro jv = do
            Just str <- fromJSVal jv
            o <- create
            setProp "mkroutput" (jsval $ pack $ mikro str) o
            return $ jsval o

    getMikroCallback <- syncCallback1' getMikro
    set_mikrokosmos getMikroCallback

main = do
    mikroCall


mikro :: String -> String
mikro = format . execute

execute :: String -> String
execute = fst . executeWithEnv librariesEnv

format :: String -> String
format = cleanlines . decolor
  where
    cleanlines = unlines . filter (/="") . lines
