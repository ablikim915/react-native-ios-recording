#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"myRnTest";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// - (void)applicationDidEnterBackground:(UIApplication *)application
// {
//   __block UIBackgroundTaskIdentifier bgTask;
//   bgTask = [application beginBackgroundTaskWithExpirationHandler:^{
//     [application endBackgroundTask:bgTask];
//     bgTask = UIBackgroundTaskInvalid;
//   }];

//   dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
//     while (1) {
//       if ([[UIApplication sharedApplication] backgroundTimeRemaining] < 1.0) {
//         break;
//       }
//       [NSThread sleepForTimeInterval:1];
//     }

//     if (bgTask != UIBackgroundTaskInvalid)
//     {
//       [application endBackgroundTask:bgTask];
//       bgTask = UIBackgroundTaskInvalid;
//     }
//   });
// }

@end
