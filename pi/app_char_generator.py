# Import Libraries
import firebase_admin
from firebase_admin import credentials, firestore
from sense_hat import SenseHat
import json 
import numpy as np
import time

# Create instance of SenseHat
sense = SenseHat()

# Get credentials from JSON 
cred = credentials.Certificate('./firebase-credentials.json')

# Initialize the app with given credentials
firebase_admin.initialize_app(cred)

# Create instance of Firestore
db = firestore.client()

# Define colors
X = [0, 255, 255]
O = [0, 0, 0]

def display_character(arr):
    character = []

    # Flatten 2D Array to 1D Array
    flat_arr = np.concatenate(arr)

    # Iterate over array values
    for i in flat_arr:
        if i == 1:
            character.append(X)
        else:
            character.append(O)
            
    sense.set_pixels(character)


def loop_characters():
    characterRef = db.collection('characters')
    characters = characterRef.get()

    for character in characters:
        data = character.to_dict()
        pixels = json.loads(data['bitArray'])

        display_character(pixels)
        time.sleep(2)

while True:
    loop_characters()