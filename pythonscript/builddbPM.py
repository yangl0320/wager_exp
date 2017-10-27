import time
import numpy as np
import scores as sc  # source: scores.py
import wager as wg  # source: wagers.py
from pymongo import MongoClient

np.set_printoptions(precision=3, suppress=True)

# connect to DB:meteor and fetch the handle of collection:wageringPM
connection = MongoClient("mongodb://127.0.0.1:3001/meteor")
db = connection.meteor.wageringPM

# recreate the collection
db.drop()
db = connection.meteor.wageringPM

fRange = [0.05 * i for i in range(21)]
wRange = [i + 1 for i in range(3)]
botFRange = [0.1 * i for i in range(11)]
#botFRange = [0.1]

for f1 in fRange:
    for w1 in wRange:
        for f2 in botFRange:
            for f3 in botFRange:
                for w2 in wRange:
                    for w3 in wRange:
                        forecasts = np.array([[f1, 1 - f1],
                                              [f2, 1 - f2],
                                              [f3, 1 - f3]])
                        wagers = np.array([w1 * 1.0, w2, w3])
                        net_pay, bet = wg.net_payoff_PPM(forecasts, wagers)
                        p1, p2, p3 = net_pay[0, :], net_pay[1, :], net_pay[2, :]
                        db.insert({'worker_forecast': "%.2f" % f1,
                                   'worker_wager': "%.2f" % w1,
                                   'worker_netpay0': "%.2f" % p1[0],
                                   'worker_netpay1': "%.2f" % p1[1],
                                   'worker_bets': ["%.2f" % bet[0, 0], "%.2f" % bet[0, 1]],
                                   'bot1_forecast': "%.2f" % f2,
                                   'bot1_wager': "%.2f" % w2,
                                   'bot1_netpay0': "%.2f" % p2[0],
                                   'bot1_netpay1': "%.2f" % p2[1],
                                   'bot1_bets': ["%.2f" % bet[1, 0], "%.2f" % bet[1, 1]],
                                   'bot2_forecast': "%.2f" % f3,
                                   'bot2_wager': "%.2f" % w3,
                                   'bot2_netpay0': "%.2f" % p3[0],
                                   'bot2_netpay1': "%.2f" % p3[1],
                                   'bot2_bets': ["%.2f" % bet[2, 0], "%.2f" % bet[2, 1]]
                                   })
                        print(forecasts)
                        print(p1, p2, p3)
