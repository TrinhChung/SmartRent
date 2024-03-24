import pandas as pd

import json
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import linear_kernel
from math import radians, sin, cos, sqrt, atan2

def load_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    df = pd.DataFrame(data)
    df['address_name'] = df['Address'].apply(lambda x: x['address'])
    df['address_lat'] = df['Address'].apply(lambda x: x['lat'])
    df['address_lng'] = df['Address'].apply(lambda x: x['lng'])
    df.drop('Address', axis=1, inplace=True)
    df.replace("", 0, inplace=True)
    df.replace({True: 1, False: 0}, inplace=True)
    return df

def create_similarity_matrix(df, numerical_features):
    numerical_df = df[numerical_features]
    scaler = StandardScaler()
    norm_data = scaler.fit_transform(numerical_df)
    nearest_neighbor = linear_kernel(norm_data, norm_data)
    indices = pd.Series(df.index)
    return nearest_neighbor, indices


def calculate_distance(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = 6371 * c 
    return distance

##
# recommend main process
# @param id idRealEstate
# @param indices index of real estate
# @param nearest_neighbor 
# @param df data frame
# @param top n size of result
##
def recommend(id_, indices, nearest_neighbor, df, top_n=20):
    similar_listings_ids = []
    idx = indices[indices == id_].index[0]
    score_series = pd.Series(nearest_neighbor[idx]).sort_values(ascending=False)
    filtered_indexes = []
    count = 0
    for index in score_series.index[1:]:  
        if df.loc[index, 'status'] == '1':
            filtered_indexes.append(index)
            count += 1
        if count == top_n: 
            break
            
    ref_lat = float(df[df['id'] == id_]['address_lat'])
    ref_lng = float(df[df['id'] == id_]['address_lng'])
    
    for i in filtered_indexes:
        sim_lat = float(df['address_lat'].iloc[i])
        sim_lng = float(df['address_lng'].iloc[i])
        distance = calculate_distance(ref_lat, ref_lng, sim_lat, sim_lng)
        similar_listings_ids.append((df['id'].iloc[i], df['address_name'].iloc[i], sim_lat, sim_lng, distance, df['status'].iloc[i]))
    similar_df = pd.DataFrame(similar_listings_ids, columns=['ID', 'Address', 'Address_lat', 'Address_lng', 'Distance', 'Status']).sort_values(by='Distance').reset_index(drop=True)
    
    # return list real estate 
    return similar_df["ID"];










