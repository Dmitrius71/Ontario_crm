/**
 * ==========================================================
 * Ontario CRM
 * UuidServiceTest
 * ==========================================================
 */

function testUuidService() {

  const uuid = UuidService.create();

  Logger.log(uuid);

  Logger.log(
    UuidService.isValid(uuid)
  );

}
