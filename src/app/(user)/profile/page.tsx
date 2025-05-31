'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
  User,
  Camera,
  Save,
  Trash2,
  Bell,
  Shield,
  Target,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { toast } = useToast();

  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe_dg',
    bio: 'Passionate disc golfer from Portland. Love playing wooded courses and working on my backhand form.',
    location: 'Portland, OR',
    yearsPlaying: '5',
    favoriteDisc: 'Innova Destroyer',
    homeCourseName: 'Pier Park',
    homeCourseLocation: 'Portland, OR',
    pdgaNumber: '123456',
    skillLevel: 'intermediate',
    throwingStyle: 'rhbh',
    maxDistance: '350'
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    bagAnalysisReminders: true,
    newDiscAlerts: false,
    communityUpdates: true,
    profileVisibility: 'public',
    bagVisibility: 'public',
    statisticsVisibility: 'friends',
    allowFriendRequests: true,
    showRealName: true,
    showLocation: true,
    showPDGANumber: false
  });

  const handleProfileSave = () => {
    // In a real app, this would save to an API
    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.'
    });
  };

  const handleSettingsSave = () => {
    // In a real app, this would save to an API
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated.'
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    toast({
      title: 'Account deletion requested',
      description: 'Your account deletion request has been submitted.',
      variant: 'destructive'
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account settings and disc golf preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="disc-golf">Disc Golf</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src="/placeholder.svg?height=80&width=80"
                      alt="Profile picture"
                    />
                    <AvatarFallback>
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself and your disc golf journey..."
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows={4}
                  />
                  <p className="text-sm text-gray-500">
                    {profile.bio.length}/500 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />
                </div>

                <Button onClick={handleProfileSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disc-golf" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Disc Golf Profile</CardTitle>
                <CardDescription>
                  Share your disc golf experience and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="yearsPlaying">Years Playing</Label>
                    <Select
                      value={profile.yearsPlaying}
                      onValueChange={(value) =>
                        setProfile({ ...profile, yearsPlaying: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<1">Less than 1 year</SelectItem>
                        <SelectItem value="1">1 year</SelectItem>
                        <SelectItem value="2">2 years</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="4">4 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skillLevel">Skill Level</Label>
                    <Select
                      value={profile.skillLevel}
                      onValueChange={(value) =>
                        setProfile({ ...profile, skillLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="throwingStyle">
                      Primary Throwing Style
                    </Label>
                    <Select
                      value={profile.throwingStyle}
                      onValueChange={(value) =>
                        setProfile({ ...profile, throwingStyle: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rhbh">
                          Right Hand Backhand (RHBH)
                        </SelectItem>
                        <SelectItem value="rhfh">
                          Right Hand Forehand (RHFH)
                        </SelectItem>
                        <SelectItem value="lhbh">
                          Left Hand Backhand (LHBH)
                        </SelectItem>
                        <SelectItem value="lhfh">
                          Left Hand Forehand (LHFH)
                        </SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxDistance">Max Distance (feet)</Label>
                    <Input
                      id="maxDistance"
                      placeholder="350"
                      value={profile.maxDistance}
                      onChange={(e) =>
                        setProfile({ ...profile, maxDistance: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favoriteDisc">Favorite Disc</Label>
                  <Input
                    id="favoriteDisc"
                    placeholder="e.g., Innova Destroyer"
                    value={profile.favoriteDisc}
                    onChange={(e) =>
                      setProfile({ ...profile, favoriteDisc: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdgaNumber">PDGA Number (Optional)</Label>
                  <Input
                    id="pdgaNumber"
                    placeholder="123456"
                    value={profile.pdgaNumber}
                    onChange={(e) =>
                      setProfile({ ...profile, pdgaNumber: e.target.value })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Home Course</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="homeCourseName">Course Name</Label>
                      <Input
                        id="homeCourseName"
                        placeholder="e.g., Pier Park"
                        value={profile.homeCourseName}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            homeCourseName: e.target.value
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="homeCourseLocation">
                        Course Location
                      </Label>
                      <Input
                        id="homeCourseLocation"
                        placeholder="City, State"
                        value={profile.homeCourseLocation}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            homeCourseLocation: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleProfileSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Disc Golf Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your information and activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Visibility</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-gray-500">
                          Who can see your profile
                        </p>
                      </div>
                      <Select
                        value={settings.profileVisibility}
                        onValueChange={(value) =>
                          setSettings({ ...settings, profileVisibility: value })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Bag Visibility</Label>
                        <p className="text-sm text-gray-500">
                          Who can see your disc bag
                        </p>
                      </div>
                      <Select
                        value={settings.bagVisibility}
                        onValueChange={(value) =>
                          setSettings({ ...settings, bagVisibility: value })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Statistics Visibility</Label>
                        <p className="text-sm text-gray-500">
                          Who can see your game statistics
                        </p>
                      </div>
                      <Select
                        value={settings.statisticsVisibility}
                        onValueChange={(value) =>
                          setSettings({
                            ...settings,
                            statisticsVisibility: value
                          })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Information Display</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Real Name</Label>
                        <p className="text-sm text-gray-500">
                          Display your real name on your profile
                        </p>
                      </div>
                      <Switch
                        checked={settings.showRealName}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showRealName: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Location</Label>
                        <p className="text-sm text-gray-500">
                          Display your location on your profile
                        </p>
                      </div>
                      <Switch
                        checked={settings.showLocation}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showLocation: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show PDGA Number</Label>
                        <p className="text-sm text-gray-500">
                          Display your PDGA number publicly
                        </p>
                      </div>
                      <Switch
                        checked={settings.showPDGANumber}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showPDGANumber: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Friend Requests</Label>
                        <p className="text-sm text-gray-500">
                          Let other users send you friend requests
                        </p>
                      </div>
                      <Switch
                        checked={settings.allowFriendRequests}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            allowFriendRequests: checked
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            emailNotifications: checked
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Bag Analysis Reminders</Label>
                        <p className="text-sm text-gray-500">
                          Get reminded to analyze your bag
                        </p>
                      </div>
                      <Switch
                        checked={settings.bagAnalysisReminders}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            bagAnalysisReminders: checked
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Disc Alerts</Label>
                        <p className="text-sm text-gray-500">
                          Get notified about new disc releases
                        </p>
                      </div>
                      <Switch
                        checked={settings.newDiscAlerts}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, newDiscAlerts: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Community Updates</Label>
                        <p className="text-sm text-gray-500">
                          Receive updates about the community
                        </p>
                      </div>
                      <Switch
                        checked={settings.communityUpdates}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            communityUpdates: checked
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSettingsSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Manage your account security and data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Management</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="mr-2 h-4 w-4" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Download Activity History
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-red-600">
                    Danger Zone
                  </h3>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-red-800 dark:text-red-200">
                          Delete Account
                        </h4>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          Once you delete your account, there is no going back.
                          Please be certain.
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove all
                              your data from our servers, including your disc
                              bag, statistics, and profile information.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Yes, delete my account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
