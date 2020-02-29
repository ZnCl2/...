intSquareRoot :: Int -> Int
intSquareRoot n = aux n
  where
    aux x
      | x*x > n = aux (x - 1)
      | otherwise = x
