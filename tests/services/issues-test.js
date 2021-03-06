const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const Issues = require('./../../services/issues');
const ApplicationStore = require('./../../services/application-store');
const TransactionHelper = require('./../../services/transaction-helper');

describe('Issues', function () {
  var numShares, hash, issueId, issuer;

  before(function(){
    numShares = 1000
    hash = TransactionHelper.generateTransactionHash()
    issueId = TransactionHelper.generateBigInt()
    issuer = 1
  })

  it('create an issue', function () {
    const res = Issues.create(numShares, hash, issueId, issuer);
    expect(res.hash).to.equal('0x' + hash);
    return ApplicationStore.getLog(hash).then((log) => {
      expect(log.data.issueId).to.equal(issueId)
      return ApplicationStore.getIssue(issueId).then((issue) => {
        expect(issue.numShares).to.equal(numShares)
        expect(issue.issuer).to.equal(issuer)
      }, (error) => {assert.fail(error)})
    }, (error) => {assert.fail(error)})
  }),

  it('get the issue', function(){
    return Issues.get(issueId).then( (issue) => {
      expect(issue.id).to.equal(issueId)
      expect(issue.numShares).to.equal(numShares)
      expect(issue.issuer).to.equal(issuer)
    }, (error) => {assert.fail(error)})
  })
})
