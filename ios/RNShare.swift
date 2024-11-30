//
//  RNShare.swift
//  starterApp
//
//  Created by Girish Parate on 30/11/24.
//
import Foundation

@objc(RNShare)
class RNShare : NSObject {
  
  // MARK: Build Config Value
  let BASE_URL = Bundle.main.object(forInfoDictionaryKey: "BASE_URL") as? String
  let BUILD_ENV = Bundle.main.object(forInfoDictionaryKey: "BUILD_ENV") as? String
  
  @objc
   func getBuildInfo (_ resolve:RCTPromiseResolveBlock,
                      reject:RCTPromiseRejectBlock){
     let parameters: [String: Any] = [
       "BASE_URL" : BASE_URL ?? "NA",
       "BUILD_ENV": BUILD_ENV ?? "NA",
     ]
     resolve(parameters);
   }
   
   @objc
   static func requiresMainQueueSetup () -> Bool {
     return true
   }
   
   @objc
   func constantsToExport() -> [AnyHashable: Any]!{
      let parameters: [String: Any] = [
        "BASE_URL" : BASE_URL ?? "NA",
        "BUILD_ENV": BUILD_ENV ?? "NA",
      ]
      return parameters;
    }

//  @objc static func requiresMainQueueSetup() -> Bool {
//      return false
//  }

  // Reference to use main thread
  @objc func open(_ options: NSDictionary) -> Void {
    DispatchQueue.main.async {
      self._open(options: options)
    }
  }

  func _open(options: NSDictionary) -> Void {
    var items = [String]()
    let message = RCTConvert.nsString(options["message"])

    if message != "" {
      items.append(message!)
    }

    if items.count == 0 {
      print("No `message` to share!")
      return
    }

    let controller = RCTPresentedViewController();
    let shareController = UIActivityViewController(activityItems: items, applicationActivities: nil);

    shareController.popoverPresentationController?.sourceView = controller?.view;

    controller?.present(shareController, animated: true, completion: nil)
  }
}


