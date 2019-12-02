import { expect } from 'chai'
import { Metric, MetricsHandler } from './metrics'
import { LevelDB } from "./leveldb"

const dbPath: string = 'db_test'
var dbMet: MetricsHandler

describe('Metrics', function () {
  before(function () {
    LevelDB.clear(dbPath)
    dbMet = new MetricsHandler(dbPath)
  })

  after(function () {
    dbMet.closeDB()
  })

  describe('#get1', function () {
    it('should get empty array on non existing group', function () {
      dbMet.get1("0", function (err: Error | null, result?: Metric[]) {
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        expect(result).to.be.empty
      })
    })
  })

  describe('#save',function(){
      it('should save date',function(){
          var met: Metric[]=[]
          met.push(new Metric("121213",10))
          dbMet.save(1,met,(err: Error | null) => {
            if (err) throw err
            dbMet.get1(1, function (err: Error | null, result: Metric[]) {
                console.log("gfdvc")
                console.log(result)
              expect(err).to.be.null
              expect(result).to.not.be.empty
              expect(result).to.not.be.undefined
              if (result){
              expect(result[0].value).to.equal(15)}
            })
          })
          
      })
  })

})

