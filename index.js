const fs = require('fs');
const colors = require('colors');
var requestify = require('requestify');
var pjson = require('./package.json');

console.log("   __  ___        __       ___          ___                     __      ".brightCyan)
console.log("  /  |/  /__ ____/ /__    / _ )__ __   / _ | __ _  ___  ___ ___/ /      ".brightCyan)
console.log(" / /|_/ / _ `/ _  / -_)  / _  / // /  / __ |/  ' \\/ _ \\/ -_) _  /     ".brightCyan)
console.log("/_/  /_/\\_,_/\\_,_/\\__/  /____/\\_, /  /_/ |_/_/_/_/ .__/\\__/\\_,_/  ".brightCyan)
console.log("                             /___/              /_/                     ".brightCyan)
console.log("\n       [+] Fivem Qbus to Esx / Esx to Qbus Converter [+]              ".brightCyan)

requestify.get('https://ampedscripts.nl/version.txt')
  .then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
      var responselmae = response.getBody();
      var version = pjson.version;
      if (response.getBody() === `${version}\n`) {
     } else {
          console.log(`\n\nThis version is outdated make sure to npm i fivem-script-converter\n\nCurrent Version: ${version}\nNewest Version: ${responselmae}`);
          process.exit();
     }
});
     

var esxtoqbus = function esxtoqbus(file){
     var code = fs.readFileSync(file,'utf8')

     code = code.replaceAll(`TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)`, `TriggerEvent('QBCore:GetObject', function(obj) QBCore = obj end)`);
     code = code.replaceAll(`while ESX == nil do`, `while QBCore == nil do`);
     code = code.replaceAll(`ESX.TriggerServerCallback`, `QBCore.Functions.TriggerCallback`);
     code = code.replaceAll(`ESX.Game.GetVehicleProperties`, `QBCore.Functions.GetVehicleProperties`);
     code = code.replaceAll(`ESX.Game.DeleteVehicle`, `QBCore.Functions.DeleteVehicle`);
     code = code.replaceAll(`ESX.Game.SpawnVehicle`, `QBCore.Functions.SpawnVehicle`);
     code = code.replaceAll(`ESX.Game.GetClosestVehicle`, `QBCore.Functions.GetClosestVehicle`);
     code = code.replaceAll(`ESX =					nil`, `QBCore = nil `);
     code = code.replaceAll(`ESX = nil`, `QBCore = nil `);
     code = code.replaceAll(`RegisterNetEvent('esx:playerLoaded'`, `RegisterNetEvent('QBCore:Client:OnPlayerLoaded'`);
     code = code.replaceAll(`AddEventHandler('esx:playerLoaded',`, `AddEventHandler('QBCore:Client:OnPlayerLoaded',`);
     code = code.replaceAll(`RegisterNetEvent('esx:setJob'`, `RegisterNetEvent('QBCore:Client:OnJobUptade'`);
     code = code.replaceAll(`AddEventHandler('esx:setJob',`, `AddEventHandler('QBCore:Client:OnJobUptade', `);
     code = code.replaceAll(`RegisterNetEvent('esx:onPlayerDeath'`, `RegisterNetEvent('QBCore:Client:OnPlayerUnload'`);
     code = code.replaceAll(`AddEventHandler('esx:onPlayerDeath',`, `AddEventHandler('QBCore:Client:OnPlayerUnload',`);
     code = code.replaceAll(`ESX.Game.GetClosestPlayer()`, `QBCore.Functions.GetClosestPlayer()`);
     code = code.replaceAll(`ESX.UI.Menu.Open`, `QBCore.UI.Menu.Open`);
     code = code.replaceAll(`ESX.UI.Menu.CloseAll()`, `QBCore.UI.Menu.CloseAll()`);
     code = code.replaceAll(`xPlayer.getInventoryItem`, `xPlayer.Functions.GetItemByName `);
     code = code.replaceAll(`RegisterNetEvent('esx:setJob'`, `RegisterNetEvent('QBCore:Client:OnJobUpdate'`);
     code = code.replaceAll(`AddEventHandler('esx:setJob', function(job)`, `AddEventHandler('QBCore:Client:OnJobUpdate', function(job)`);
     code = code.replaceAll(`xPlayer.removeAccountMoney('bank', amount)`, `ply.Functions.AddMoney('bank', amount, "Bank depost")`);
     code = code.replaceAll(`xPlayer.addMoney(amount)`, `ply.Functions.RemoveMoney('cash', amount, "Bank depost")`);
     code = code.replaceAll(`xPlayer.getAccount('bank').money`, `ply.PlayerData.money["bank"]`);
     code = code.replaceAll(`xPlayer.removeInventoryItem `, `xPlayer.Functions.RemoveItem `);
     code = code.replaceAll(`xPlayer.addInventoryItem`, `xPlayer.Functions.AddItem`);
     code = code.replaceAll(`ESX.GetPlayerFromId`, `QBCore.Functions.GetPlayer`);
     code = code.replaceAll(`ESX.GetPlayerFromIdentifier`, `QBCore.Functions.GetPlayerByCitizenId`);
     code = code.replaceAll(`ESX.Math.Trim(value)`, `QBCore.Functions.MathTrim`);
     code = code.replaceAll(`ESX.GetPlayerData()`, `QBCore.Functions.GetPlayerData()`);
     code = code.replaceAll(`ESX.RegisterUsableItem()`, `QBCore.Functions.CreateUseableItem()`);
     code = code.replaceAll(`xPlayer.removeMoney(money)`, `Player.Functions.RemoveMoney()`);
     code = code.replaceAll(`ESX.RegisterServerCallback()`, `QBCore.Functions.CreateCallback()`);
     code = code.replaceAll(`ESX.TriggerServerCallback()`, `QBCore.Functions.TriggerCallback()`);
     code = code.replaceAll(`ESX.RegisterServerCallback("system:fetchStatus", function(source, cb)
     local src = source
     local user = ESX.GetPlayerFromId(src)
     local fetch = [[
          SELECT
               skills
          FROM
               users
          WHERE
               identifier = @identifier
     ]]
     MySQL.Async.fetchScalar(fetch, {
          ["@identifier"] = user.identifier
     }, function(status)
          if status ~= nil then
               cb(json.decode(status))
          else
               cb(nil)
          end
     end)
     end)`, `QBCore.Functions.CreateCallback('system:fetchStatus', function(source, cb)
     local Player = QBCore.Functions.GetPlayer(source)
      if Player then
            exports['ghmattimysql']:execute('SELECT skills FROM players WHERE citizenid = @citizenid', {
                ['@citizenid'] = Player.PlayerData.citizenid
           }, function(status)
               if status ~= nil then
                    cb(json.decode(status))
               else
                    cb(nil)
               end
           end)
      else
           cb()
      end
     end)`);
     code = code.replaceAll(`RegisterCommand `, `QBCore.Commands.Add()`);
     code = code.replaceAll(`local user = ESX.GetPlayerFromId(src)`, `local Player = QBCore.Functions.GetPlayer(source)`);
     code = code.replaceAll(`["@identifier"] = user.identifier`, `['@citizenid'] = Player.PlayerData.citizenid`);

     fs.writeFileSync('output.lua', code, function (err) {
         if (err) return console.log(err);
     });

     console.log(`Succesfully converted the ${file} from ESX to Qbus!`)
};

var qbustoesx = function qbustoesx(file){
     var code = fs.readFileSync(file,'utf8')
     code = code.replaceAll(`TriggerEvent('QBCore:GetObject', function(obj) QBCore = obj end)`, `TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)`);
     code = code.replaceAll(`QBCore = exports['qb-core']:GetCoreObject()`, `TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)`);
     code = code.replaceAll(`local QBCore = exports['qb-core']:GetCoreObject()`,`ESX = nil\nTriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)`);
     code = code.replaceAll(`while QBCore == nil do`, `while ESX == nil do`);
     code = code.replaceAll(`QBCore.Functions.TriggerCallback`, `ESX.TriggerServerCallback`);
     code = code.replaceAll(`QBCore.Functions.GetVehicleProperties`, `ESX.Game.GetVehicleProperties`);
     code = code.replaceAll(`QBCore.Functions.DeleteVehicle`, `ESX.Game.DeleteVehicle`);
     code = code.replaceAll(`QBCore.Functions.SpawnVehicle`, `ESX.Game.SpawnVehicle`);
     code = code.replaceAll(`QBCore.Functions.GetClosestVehicle`, `ESX.Game.GetClosestVehicle`);
     code = code.replaceAll(`QBCore = nil`, `ESX = nil`);
     code = code.replaceAll(`QBCore == nil`, `ESX == nil`);
     code = code.replaceAll(`RegisterNetEvent('QBCore:Client:OnPlayerLoaded'`, `RegisterNetEvent('esx:playerLoaded'`);
     code = code.replaceAll(`AddEventHandler('QBCore:Client:OnPlayerLoaded',`, `AddEventHandler('esx:playerLoaded',`);
     code = code.replaceAll(`RegisterNetEvent('QBCore:Client:OnJobUptade'`, `RegisterNetEvent('esx:setJob'`);
     code = code.replaceAll(`AddEventHandler('QBCore:Client:OnJobUptade', `, `AddEventHandler('esx:setJob',`);
     code = code.replaceAll(`RegisterNetEvent('QBCore:Client:OnPlayerUnload'`, `RegisterNetEvent('esx:onPlayerDeath'`);
     code = code.replaceAll(`AddEventHandler('QBCore:Client:OnPlayerUnload',`, `AddEventHandler('esx:onPlayerDeath',`);
     code = code.replaceAll(`QBCore.Functions.GetClosestPlayer()`, `ESX.Game.GetClosestPlayer()`);
     code = code.replaceAll(`QBCore.UI.Menu.Open`, `ESX.UI.Menu.Open`);
     code = code.replaceAll(`QBCore.UI.Menu.CloseAll()`, `ESX.UI.Menu.CloseAll()`);
     code = code.replaceAll(`xPlayer.Functions.GetItemByName `, `xPlayer.getInventoryItem`);
     code = code.replaceAll(`RegisterNetEvent('QBCore:Client:OnJobUpdate'`, `RegisterNetEvent('esx:setJob'`);
     code = code.replaceAll(`AddEventHandler('QBCore:Client:OnJobUpdate', function(job`, `AddEventHandler('esx:setJob', function(job)`);
     code = code.replaceAll(`ply.Functions.AddMoney`, `xPlayer.removeAccountMoney`);
     code = code.replaceAll(`ply.Functions.RemoveMoney`, `xPlayer.addMoney`);
     code = code.replaceAll(`ply.PlayerData.money["bank"]`, `xPlayer.getAccount('bank').money`);
     code = code.replaceAll(`xPlayer.Functions.RemoveItem `, `xPlayer.removeInventoryItem`);
     code = code.replaceAll(`xPlayer.Functions.AddItem`, `xPlayer.addInventoryItem`);
     code = code.replaceAll(`QBCore.Functions.GetPlayer`, `ESX.GetPlayerFromId`);
     code = code.replaceAll(`QBCore.Functions.GetPlayerByCitizenId`, `ESX.GetPlayerFromIdentifier`);
     code = code.replaceAll(`QBCore.Functions.MathTrim`, `ESX.Math.Trim(value)`);
     code = code.replaceAll(`QBCore.Functions.GetPlayerData`, `ESX.GetPlayerData`);
     code = code.replaceAll(`QBCore.Functions.CreateUseableItem`, `ESX.RegisterUsableItem`);
     code = code.replaceAll(`Player.Functions.RemoveMoney`, `xPlayer.removeMoney`);
     code = code.replaceAll(`QBCore.Functions.CreateCallback`, `ESX.RegisterServerCallback`);
     code = code.replaceAll(`QBCore.Functions.TriggerCallback`, `ESX.TriggerServerCallback`);
     code = code.replaceAll(`QBCore.Functions.CreateCallback('system:fetchStatus', function(source, cb)
     local Player = QBCore.Functions.GetPlayer(source)

      if Player then
            exports['ghmattimysql']:execute('SELECT skills FROM players WHERE citizenid = @citizenid', {
                ['@citizenid'] = Player.PlayerData.citizenid
           }, function(status)
               if status ~= nil then
                    cb(json.decode(status))
               else
                    cb(nil)
               end
           end)
      else
           cb()
      end
     end)`, `ESX.RegisterServerCallback("system:fetchStatus", function(source, cb)
     local src = source
     local user = ESX.GetPlayerFromId(src)


     local fetch = [[
          SELECT
               skills
          FROM
               users
          WHERE
               identifier = @identifier
     ]]

     MySQL.Async.fetchScalar(fetch, {
          ["@identifier"] = user.identifier

     }, function(status)

          if status ~= nil then
               cb(json.decode(status))
          else
               cb(nil)
          end

     end)
     end)`);
     code = code.replaceAll(`QBCore.Commands.Add`, `RegisterCommand`);
     code = code.replaceAll(`local Player = QBCore.Functions.GetPlayer(source)`, `local user = ESX.GetPlayerFromId(src)`);
     code = code.replaceAll(`['@citizenid'] = Player.PlayerData.citizenid`, `["@identifier"] = user.identifier`);

     fs.writeFileSync('output.lua', code, function (err) {
         if (err) return console.log(err);
     });

     console.log(`Succesfully converted the ${file} from Qbus to ESX!`)
};

module.exports.qbustoesx = qbustoesx;
module.exports.esxtoqbus = esxtoqbus;