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
import Text.ParserCombinators.Parsec


-- Calling Mikrokosmos from Javascript
foreign import javascript unsafe "mikrokosmos = $1"
    set_mikrokosmos :: Callback a -> IO ()

mikroCall = do
    let getHello jv = do
            Just str <- fromJSVal jv
            o <- create
            setProp "mkroutput" (jsval $ pack $ mikro str) o
            return $ jsval o

    getMikroCallback <- syncCallback1' getHello
    set_mikrokosmos getMikroCallback

main = do
    mikroCall



mikro :: String -> String
mikro = format . execute

execute :: String -> String
execute code = do
  let parsing = map (parse actionParser "") $ filter (/="") $ lines code
  let actions = catMaybes $ map (\x -> case x of
                             Left _  -> Nothing
                             Right a -> Just a) parsing
  case runState (multipleAct actions) defaultEnv of
    (outputs, _) -> unlines outputs

removeString :: String -> String -> String
removeString _ "" = ""
removeString t s@(c:sc)
  | t `isPrefixOf` s = removeString t (drop (length t) s)
  | otherwise = c : removeString t sc

format :: String -> String
format = cleanlines . decolor
  where
    cleanlines = unlines . filter (/="") . lines
