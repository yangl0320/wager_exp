import numpy as np


def Brier_score(P, b=2, a=-1):
    # P is the forcast maxtrix
    # score = b + a*(2*(p-x)^2) when x is binary
    return b + a * (1 - 2 * P + np.sum(P**2, axis=1)[:, None])


def positive_quadratic_score(P):
    # standard quadratic score + 1 so that the range is [0,2]
    # forecasters wnats to maximize standard quadratic score
    # P is the forcast maxtrix
    return Brier_score(P, 2, -1)


def affine_payment_by_score_rule(score_matrix, a, b):
    # a*score+b
    return a * score_matrix + b


def confidence_weighted_score(score_matrix, confidence_vector):
    return np.dot(score_matrix, confidence_vector)


def confidence_weighted_Brier_score(P, confidence_vector):
    return confidence_weighted_score(Brier_score(P), confidence_vector)


def payment_in_expection(payment_matrix, p_dist):
    # payment_maxtrix - the payments of all forecasters (row) under all realizations (column)
    # p_dist - probability distribution of the outcome
    return np.dot(payment_matrix, p_dist)


def competitive_score_rule(score_matrix, subsidy=0):
    # competitive scoring rule
    # from paper "Elicitation of Probabilities Using Competitive Scoring Rules"
    # competitive_score_i = score_i-1/(n-1)*sum_{j!=i} score_j for each realization
    n = np.shape(score_matrix)[0]
    sum_of_scores_of_all_forecasters = np.sum(score_matrix, axis=0)
    if not np.isscalar(subsidy):
        subsidy = np.reshape(subsidy, (-1, 1))
    return (score_matrix * n / (n - 1) -
            sum_of_scores_of_all_forecasters / (n - 1) + subsidy)


def competitive_quadratic_score_rule(P, subsidy=0):
    # competitive scoring rule with quadratic score as base score
    # P is the forcast maxtrix
    return competitive_score_rule(Brier_score(P), subsidy)


'''
# Set the outcome and participant
d = 2 # # of realizations of outcome
n = 100 # # of participants

# Generate the ground truth distribution of the outcome
p_truth = np.random.dirichlet(np.ones((d,)))
print(p_truth)

# Generate participants' true believes and each row represents one belief
forecasts = np.random.dirichlet(np.ones((d,)),size = n)
quadratic_scores = -Brier_score(forecasts)
competitive_quadratic_scores = competitive_quadratic_score_rule(forecasts)

np.set_printoptions(precision=3, suppress = True)
#print((quadratic_scores[:,0],competitive_quadratic_scores[:,0]))
print(np.column_stack((quadratic_scores[:,0],competitive_quadratic_scores[:,0])))
print(np.reshape(quadratic_scores[:,0]-competitive_quadratic_scores[:,0]-(quadratic_scores[0,0]-competitive_quadratic_scores[0,0]),(-1,1)))
a = [[1,10],[100,1000],[10000,100000]]
b = [[1,2],[3,4],[5,6]]
b = np.array(b)
'''