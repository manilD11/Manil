import express from 'express'
import type {Router} from 'express'
import { validateNumericId,pleaseAuth } from '../middleware/pets.middleware'

import {getPets, getPetById} from '../controller/pet.controllers'

export const petRouter:Router = express.Router()



petRouter.get('/',getPets)

petRouter.get('/:id',pleaseAuth, validateNumericId, getPetById) 