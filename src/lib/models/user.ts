import type {Document, Model} from 'mongoose';

import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
const cardNumberRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/g;
const expMonthRegex = /^[1-9]|1[012]$]/g;
const expYearRegex = /^\d{4}$/g;
const cvcCodeRegex = /^\d{3}$/g;

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  phone: number;
  address_1: string;
  address_2: string;
  address_3: string;
  postcode: number;
  city: string;
  country: string;
  card_type: string;
  card_number: number;
  exp_month: number;
  exp_year: number;
  cvc_code: number;
}

export interface UserDocument extends UserSchema, Document {
  comparePassword(candidatePassword: string): UserDocument;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => emailRegex.test(v),
    },
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  phone: {
    type: Number,
    required: true,
  },
  address_1: {
    type: String,
    required: true,
  },
  address_2: String,
  address_3: String,
  postcode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  card_type: {
    type: String,
    required: true,
  },
  // TODO: hash the credit card number in the DB
  card_number: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => cardNumberRegex.test(v.toString()),
    },
  },
  exp_month: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => expMonthRegex.test(v.toString()),
    },
  },
  exp_year: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => expYearRegex.test(v.toString()),
    },
  },
  cvc_code: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => cvcCodeRegex.test(v.toString()),
    },
  },
});

UserSchema.pre('save', function (next) {
  const user: UserDocument = this as UserDocument;
  // only has the passwrod if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password, function (
    err,
    isMatch
  ) {
    if (err) throw err;
    return isMatch;
  });
};

const User = mongoose.model<UserDocument, Model<UserDocument>>(
  'User',
  UserSchema
);

export default User;
