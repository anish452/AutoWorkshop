const BaseRepository = require('./BaseRepository');

class AIAnalysisLogRepository extends BaseRepository {
  constructor() {
    super('aIAnalysisLog');
  }
}

module.exports = new AIAnalysisLogRepository();
