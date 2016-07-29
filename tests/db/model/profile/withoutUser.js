/**
 * tests/db/model/profile/withoutUser.js
 */
'use strict';

const expect = require('chai').expect;
const tu = require('../../../testUtils');
const u = require('./utils');
const Profile = tu.db.Profile;

describe('Profile model without users', () => {
  let p = {};

  beforeEach((done) => {
    Profile.create({ name: `${tu.namePrefix}1` })
    .then((createdProfile) => {
      p = createdProfile;
      done();
    })
    .catch((err) => done(err));
  });

  afterEach(u.forceDelete);

  it('Expect to throw error, if set an access field to invalid string');

  it('Expect to throw error, if set an access field to object');

  it('Expect to throw error, if set an access field to number');

  it('Expect to throw error, if set userCount');

  it('Newly created profile, includes expected fields');

  it('Get deleted profile by id, should return null, if find with paranoid ' +
  'true', (done) => {
    p.destroy()
    .then(() => Profile.findOne({
      where: { id: p.id },
      paranoid: true,
    }))
    .then((foundProfile) => {
      expect(foundProfile).to.equal(null);
      done();
    })
    .catch((err) => done(err));
  });

  it('Get deleted profile by id, should return null, if find with paranoid ' +
  'false', (done) => {
    p.destroy()
    .then(() => Profile.findOne({
      where: { id: p.id },
      paranoid: false,
    }))
    .then((foundProfile) => {
      expect(!foundProfile);
      done();
    })
    .catch((err) => done(err));
  });

  it('Get deleted profile by id, should return null', (done) => {
    p.destroy()
    .then(() => Profile.findById(p.id))
    .then((foundProfile) => {
      expect(foundProfile).to.equal(null);
      done();
    })
    .catch((err) => done(err));
  });

  it('Deleting profile without children, deletes successfully, and returns ' +
  'deleted profile', (done) => {
    p.destroy()
    .then((destroyedProfile) => {
      expect(destroyedProfile.dataValues.name).to.equal(p.name);
      done();
    })
    .catch((err) => done(err));
  });
});
