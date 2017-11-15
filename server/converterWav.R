needs("seewave")
needs("tuneR")
needs("ForeCA")
needs("e1071")
conversion <- function(input){
  training <- read.csv('/Users/walejegede/Fullstack/stackathon/server/voice.csv')
  training <- subset(training, select = -c(sd, IQR, sfm, centroid, mindom, dfrange))
  # pr <- spec(readWave('/Users/walejegede/Downloads/cozywaved8overload.wav'))
  # pr <- specprop(pr, str = FALSE, mel = FALSE, plot = FALSE)
  # df <- as.data.frame(dfreq(readWave('/Users/walejegede/Downloads/cozywaved8overload.wav')))
  # free <- as.data.frame(spectral_entropy(spec(readWave('/Users/walejegede/Downloads/cozywaved8overload.wav'))))
  # fundy <- as.data.frame(fund(readWave('/Users/walejegede/Downloads/cozywaved8overload.wav'), plot = FALSE))
  # fundy <- na.omit(fundy)
  # pr$meanfreq <- pr$mean
  # pr$skew <- pr$skewness
  # pr$kurt <- pr$kurtosis
  # pr$minfun <- max(fundy$y)
  # pr$maxfun <- min(fundy$y)
  # pr$meanfun <- mean(fundy$y)
  # pr$modindx <- sum(abs(diff(fundy$y))) / (max(fundy$y) - min(fundy$y))
  # pr$meandom <- mean(df$y)
  # pr$maxdom <- max(df$y)
  # pr$sp.ent <- free$V1[1]
  # pr <- subset(pr, select = -c(mean, sem, IQR, kurtosis, cent, skewness, sfm, sh, prec, sd))

  set.seed(777)
  svmTune <- tune.svm(label ~ ., data=training, sampling='fix', gamma = seq(0.2, 0.25, 0.01), cost = seq(8, 12, 1))
  genderSvm <- svmTune$best.model

  predictSvm <- as.data.frame(predict(genderSvm, training[2443,]))
  output <- toString(predictSvm$`predict(genderSvm, training[2443, ])`)
  return(output)
}

conversion()
